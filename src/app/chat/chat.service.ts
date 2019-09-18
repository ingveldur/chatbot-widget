import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiAiClient } from "api-ai-javascript/es6/ApiAiClient";

@Injectable({
	providedIn: "root"
})
export class ChatService {
	readonly token = environment.dialogFlow.angularBot;
	readonly client = new ApiAiClient({ accessToken: this.token });

	constructor() {}

	//Sends and receives message via dialog flow
	public converse = (msg: string) => this.client.textRequest(msg);
}
