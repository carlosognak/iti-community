import { split } from 'lodash';
import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`)
    }
  }

  private parseMessage(message: string): PostMessage {
    // TODO rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|png|gif)/gmi;

    // TODO mp4,wmv,flv,avi,wav
    const videoRegex = /http[s]?:\/\/.+\.(mp4|wmv|flv|avi|wav)/gmi;

    // TODO mp3,ogg,wav
    const audioRegex = /http[s]?:\/\/.+\.(mp3|ogg|wav)/gmi;
    const tagRegex = /@{1}[a-zA-Z0-9]{1,256}/gmi;
    const youtubeRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/gmi;
    //const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gmi;

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
      // TODO ajouter un attachement de type image dans attachements
      message = pictureMatche[1]

      attachements.push({ type: 'image', url: pictureMatche[0] } as MessageImageElement)
    }

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
      // TODO ajouter un attachement de type video dans attachements
      message = videoMatche[1]
      attachements.push({ type: 'video', url: videoMatche[0] } as MessageVideoElement)
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
      // TODO ajouter un attachement de type audio dans attachements
      message = audioMatche[1]
      attachements.push({ type: 'audio', url: audioMatche[0] } as MessageAudioElement)
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
      // TODO ajouter un attachement de type youtube dans attachements
      message = youtubeMatche['input'].split(youtubeMatche[0]).join(" ");
      const videoId = youtubeMatche[1]
      attachements.push({ type: 'youtube', videoId })
    }

    const linkMatche = linkRegex.exec(message);
    if (linkMatche) {
      message = linkMatche.input.split(linkMatche[0]).join("<a href=" + linkMatche[0] + "> " + linkMatche[0] + "</a> ");
    }

    const tagMatche = tagRegex.exec(message);
    if (tagMatche) {
      message = tagMatche.input.split(tagMatche[0]).join("<p  class='post-userTag'> " + tagMatche[0] + "</p> ");
    }
    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
