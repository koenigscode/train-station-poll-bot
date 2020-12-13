// @ts-nocheck
require("dotenv").config({ path: "env_file" })
import Telegraf, { Context } from "telegraf"
const bot = new Telegraf(process.env.BOT_TOKEN)

const schedule = require("node-schedule")

let isActive = true

const send = async (ctx: Context) => {
    if (isActive) {
        const chatId = ctx.chat.id
        bot.telegram.sendPoll(
            chatId,
            "Wer wartet heute am Bahnhof?",
            ["Warte", "Warte nicht"],
            { is_anonymous: false }
        )
    }
}

bot.command("activate", () => {
    isActive = true
})

bot.command("deactivate", () => {
    isActive = false
})

bot.command("poll", send)

bot.launch().then(() => {
    console.log("bot launched")
})
