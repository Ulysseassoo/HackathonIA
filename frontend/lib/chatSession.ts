export class ChatSession {
    conversationId = `web-${crypto.randomUUID()}`;
    debug = false;

    constructor(public agentId: string) {}

    buildPayload(message: string, context = true) {
        const payload: any = { message };

        if (context) {
            payload.thread_id = this.conversationId;
            payload.conversation_id = this.conversationId;
            payload.chat_id = this.conversationId;
        }

        payload.context = {
            configurable: {
                __bearer_token: process.env.NEXT_PUBLIC_BEARER,
            },
        };

        return payload;
    }

    resetConversation() {
        this.conversationId = `web-${crypto.randomUUID()}`;
    }
}
