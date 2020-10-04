export const getAvatar = () => {
    const size = Math.floor(Math.random() * 100) + 25;

    return `https://www.placecage.com/${size}/${size}`;
};