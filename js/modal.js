export const Modal = {
  open(domContent) {
    while (window.modalContentRef.firstChild) {
      window.modalContentRef.removeChild(window.modalContentRef.firstChild);
    }
    window.modalContentRef.appendChild(domContent);
    window.modalComponentRef.showModal();
    document.body.classList.add('modal-open');
  },
  close() {
    window.modalComponentRef.close();
    document.body.classList.remove('modal-open');
  }
};