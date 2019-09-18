import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatAvatarComponent } from './chat-avatar/chat-avatar.component'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { ChatConfigComponent } from './chat-config/chat-config.component'
import { ChatService } from './chat.service';
import { TrackService } from './track.service';

@NgModule({
	imports: [CommonModule],
	declarations: [ChatAvatarComponent, ChatWidgetComponent, ChatInputComponent, ChatConfigComponent],
	exports: [ChatWidgetComponent, ChatConfigComponent],
	entryComponents: [ChatWidgetComponent, ChatConfigComponent],
	providers: [ChatService, TrackService],
})
export class ChatModule { }
