window.onload = () => {
  document.addEventListener('scroll', function () {
    const docElem = document.documentElement;
    const docBody = document.body;
    const scrollTop = docElem['scrollTop'] || docBody['scrollTop'];
    const scrollBottom =
      (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight;
    const scrollPercent = (scrollTop / scrollBottom) * 100 + '%';

    document
      .getElementById('progress-bar')
      .style.setProperty('--scrollAmount', scrollPercent);
  });
};
