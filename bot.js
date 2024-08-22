const { ActivityHandler, MessageFactory } = require('botbuilder');

class Bot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const replyText = `Bin: ${ context.activity.text }`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            // const membersAdded = context.activity.membersAdded;
            // const welcomeText = 'Hello my name is Bin. How can I help you?';
            // for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
            //     if (membersAdded[cnt].id !== context.activity.recipient.id) {
            //         await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
            //     }
            // }
            await this.sendWelcomeMessage(context);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

    }

    async sendWelcomeMessage(turnContext) {
        const { activity } = turnContext;

        for(const idx in activity.membersAdded) {
            if(activity.membersAdded[idx].id !== activity.recipient.id) {
                const welcomeMessage = `Hello my name is Bin. How can I help you? ${ activity.membersAdded[idx].name} `;
                await turnContext.sendActivity(welcomeMessage);
                await this.sendSuggentedActions(turnContext);
            }
        }
    }

    async sendSuggentedActions(turnContext) {
        var reply = MessageFactory.suggestedActions(['About', 'Professional Experience', 'Address'], 'What would you like to do');
        await turnContext.sendActivity(reply)
    }

}

module.exports.Bot = Bot;
