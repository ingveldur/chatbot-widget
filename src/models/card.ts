import Button from './button';

export default interface Card {
    messageType: string,
    from: string,
    title: string,
    subtitle: string,
    imageUrl?: string,
    buttons?: Button[],
    date: number,
    type: string,
}