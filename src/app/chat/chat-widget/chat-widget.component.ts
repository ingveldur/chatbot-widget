import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation, Renderer2 } from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'
import { ChatService } from '../chat.service';
import { TrackService } from '../track.service';
import Message from 'src/models/message';
import Card from 'src/models/card';

@Component({
	selector: 'chat-widget',
	templateUrl: './chat-widget.component.html',
	styleUrls: ['./chat-widget.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
	animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {

	@ViewChild('bottom') bottom: ElementRef;
	readonly botGreeting = 'Hello there. I\'m Sbotti, the service robot and I\'m here to help! Ask me anything about the hotel or its services.';
	public messages = [];
	public _visible = false;
	public focus = new Subject();

	public operator = {
		name: 'Service robot',
		avatar: `https://sbotti.firebaseapp.com/assets/images/support.svg`,
		phone: '+1 312 690 9569',
	}

	public client = {
		name: 'Guest',
	}

	public get visible() {
		return this._visible;
	}

	@Input() public set visible(visible) {
		this._visible = visible
		if (this._visible) {
			setTimeout(() => {
				this.scrollToBottom()
				this.focusMessage()
			}, 0)
		}
	}

	constructor(private chatService: ChatService, private trackService: TrackService) { }

	ngOnInit() {
		setTimeout(() => this.visible = true, 1000);
		this.appendGreeting();
	}

	sendMessage = async ({ message }) => {
		if (message.trim() === '') {
			return;
		}
		this.appendMessage(this.client, message, 'sent');
		const response = await this.chatService.converse(message);
		if (response.result.fulfillment.messages.length > 0) {
			response.result.fulfillment.messages.forEach(message => {
				if (message.type === 0) { // Text message
					this.appendMessage(this.operator, message.speech, 'received');
				} else if (message.type === 1) { // Card message
					this.appendCard(this.operator, message.title, message.subtitle, message.imageUrl, message.buttons, 'received');
				}
			});
		}

		if (response.result.action === "input.unknown") {
			this.trackService.unrecognizedQuery(message).toPromise().catch(err => console.log(err))
		}
	}


	appendMessage = (from, text, type: 'received' | 'sent') => {
		let message: Message = ({
			messageType: "text",
			from: from,
			text: text,
			type: type,
			date: new Date().getTime(),
		});

		setTimeout(() => {
			this.messages.unshift(message)
			this.scrollToBottom();
		});
	}

	appendCard = (from, title, subtitle, imageUrl, buttons, type: 'received' | 'sent') => {
		let card: Card = ({
			messageType: "card",
			from: from,
			title: title,
			subtitle: subtitle,
			imageUrl: imageUrl,
			buttons: buttons,
			type: type,
			date: new Date().getTime(),
		});

		setTimeout(() => {
			this.messages.unshift(card);
			this.scrollToBottom();
		})
	}

	scrollToBottom = () => this.bottom !== undefined ? this.bottom.nativeElement.scrollIntoView() : null;

	focusMessage = () => this.focus.next(true);

	toggleChat = () => this.visible = !this.visible;

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent = (event: KeyboardEvent) => {
		if (event.key === '/') {
			this.focusMessage();
		}
		if (event.key === '?' && !this._visible) {
			this.toggleChat();
		}
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	clearChat() {
		this.messages = [];
		this.appendGreeting();
	}

	appendGreeting() {
		setTimeout(() => { this.appendMessage(this.operator, this.botGreeting, 'received') }, 500);
	}
}
