import { createRequire } from "module";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs"
const REMINDERS = [7, 5, 2, 1,]
const require = createRequire(import.meta.url)
const { serve } = require("@upstash/workflow/express")

export const sendReminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId)
    if (!subscription || subscription.status !== "active") return;


    const renwalDate = dayjs(subscription.renewalDate)
    if (renwalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId} . stopping workflow`)
        return;
    }
    for (const daysBefore of REMINDERS) {
        const reminderDate = renwalDate.subtract(daysBefore, "day")
        if (reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`,reminderDate)
        }
    }
})

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscription", () => {
        return Subscription.findById(subscriptionId).populate("user", "name email")
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`)
    await context.sleepUntil(label, date.toDate())
}

const triggerRemindetr = async (context, label,subscription) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`)
      

    })
}