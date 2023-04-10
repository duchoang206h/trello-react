export const isEmptyText = (text) => !text || !text.trim();
export const isLogged = () => localStorage.getItem('accessToken');
