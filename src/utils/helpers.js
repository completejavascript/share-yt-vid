export const validateYoutubeUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const regex = /^((http(s)?:\/\/)?)(www\.)?((youtube\.com\/)|(youtu.be\/))[\S]+$/;
  return regex.test(url);
};
