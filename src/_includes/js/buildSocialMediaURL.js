// This will build the social media links for the blog
// To share content easily

const title = document.querySelector('h1').innerText;
const url = window.location.href;

// facebook share url
const facebook = document.querySelectorAll('.share-facebook');
if (facebook) {
  facebook.forEach((node) =>
    node.setAttribute('href', 'https://facebook.com/sharer.php?u=' + url)
  );
}

// mail share url
const mail = document.querySelectorAll('.share-mail');
if (mail) {
  mail.forEach((node) =>
    node.setAttribute(
      'href',
      'mailto:?subject=' +
        title +
        '&body=Check out this cool blog by akhilmhdh.com: ' +
        url
    )
  );
}

//  twitter url
const twitter = document.querySelectorAll('.share-twitter');
if (twitter) {
  twitter.forEach((node) =>
    node.setAttribute(
      'href',
      'https://twitter.com/share?url=' +
        url +
        '&text=' +
        title +
        ' from @akhilmhdh \n'
    )
  );
}

const linkedin = document.querySelectorAll('.share-linkedin');
if (linkedin) {
  linkedin.forEach((node) =>
    node.setAttribute(
      'href',
      'https://www.linkedin.com/sharing/share-offsite/?url=' + url
    )
  );
}
