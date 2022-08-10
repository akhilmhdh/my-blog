// This will build the social media links for the blog
// To share content easily

window.onload = () => {
  const title = document.querySelector('h1').innerText;
  const url = window.location.href;

  // facebook share url
  const facebook = document.querySelector('#share-facebook');
  if (facebook) {
    facebook.setAttribute('href', 'https://facebook.com/sharer.php?u=' + url);
  }

  // mail share url
  const mail = document.querySelector('#share-mail');
  if (mail) {
    mail.setAttribute(
      'href',
      'mailto:?subject=' +
        title +
        '&body=Check out this cool blog by akhilmhdh.com: ' +
        url
    );
  }

  //  twitter url
  const twitter = document.querySelector('#share-twitter');
  if (twitter) {
    twitter.setAttribute(
      'href',
      'https://twitter.com/share?url=' +
        url +
        '&text=' +
        title +
        ' from @akhilmhdh \n'
    );
  }

  const linkedin = document.querySelector('#share-linkedin');
  if (linkedin) {
    linkedin.setAttribute(
      'href',
      'https://www.linkedin.com/sharing/share-offsite/?url=' + url
    );
  }
};
