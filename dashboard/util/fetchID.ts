export default function fetchID(imageURL: string) {
    const id = imageURL.replace('https://cdn.discordapp.com/avatars/', '').replace('/', '').slice(0, 18);
    return id;
}