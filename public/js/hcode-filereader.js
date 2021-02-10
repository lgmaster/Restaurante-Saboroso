class HcodeFileReader {

  constructor(inputEl, imgEl) {

    this.inputEl = inputEl;
    this.imgEl = imgEl;

    this.initInputEvent();
 
  }


  initInputEvent() {

    document.querySelector(this.inputEl).addEventListener('change', event => {

      this.reader(event.target.files[0]).then(result => {

        document.querySelector(this.imgEl).src = result;

      });

    });

  }

  reader(file) {

    return new Promise((resolve, reject) => {

      let reader = new FileReader();
  
      reader.onload = () => {
  
        resolve(reader.result);

      }

      reader.onerror = () => {

        reject('Não foi possível ler a imagem')

      }
  
      reader.readAsDataURL(file);

    });


  }

}