import Swal from 'sweetalert2'

export const AlertService = {
  initializeSwal () {
    window.swal = Swal

    window.confirmCreateAlert = Swal.mixin({
      customClass: {
        confirmButton: 'e-btn e-btn-blue e-text-white mr-2',
        cancelButton: 'e-btn e-btn-blue-gray e-text-white'
      },
      icon: 'question',
      buttonsStyling: false
    })

    window.confirmUpdateAlert = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-warning font-weight-bolder mr-2',
        cancelButton: 'btn btn-outline-secondary font-weight-bolder'
      },
      buttonsStyling: false
    })

    window.deleteAlert = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger font-weight-bolder mr-2',
        cancelButton: 'btn btn-outline-secondary font-weight-bolder'
      },
      buttonsStyling: false
    })

    window.serverErrorAlert = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger font-weight-bolder mr-2'
      },
      buttonsStyling: false
    })

    window.successAlert = Swal.mixin({
      customClass: {
        // confirmButton: 'btn btn-success font-weight-bolder mr-2'
      },
      buttonsStyling: false
    })

    window.errorAlert = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger font-weight-bolder mr-2'
      },
      buttonsStyling: false,
      allowOutsideClick: false
    })

    window.systemUpdateModal = Swal.mixin({
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      customClass: 'swal-wide'
    })
  },


  //question
  questionAlertService(text,actionType = '',icon,__customCss){
    return  Swal.fire({
      title : `${actionType}`,
      icon : `${icon}`,
      text : `${text}`,
      // html: `<pre class="ml-1 small multiline ${__customCss}">${_html}</pre>`,
      showCancelButton: true,
      allowOutsideClick: false,
      customClass : {
        container : 'swal-container',
        confirmButton: 'btn btn-primary font-weight-bolder',
        cancelButton: 'btn btn-secondary font-weight-bolder',
      }
    }).then(r =>{
      return r.value;
    });
  },

  async confirmUpdateAlert (message) {
    if (!message) message = 'Are you sure you want to update this record?'
    // eslint-disable-next-line no-undef
    return await confirmUpdateAlert.fire({
      title: 'CONFIRM UPDATE',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      scrollbarPadding: false
    }).then((result) => {
      return result.value
    })
  },

  async confirmDeleteAlert (message) {
    if (!message) message = 'Are you sure you want to delete this record?'
    // eslint-disable-next-line no-undef
    return await deleteAlert.fire({
      title: 'CONFIRM DELETE',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      scrollbarPadding: false
    }).then((result) => {
      return result.value
    })
  },

  // success
  successAlert (text, actionType = '', html) {
    let ht = html ? html : ''
    return swal.fire({
      title: `${actionType}`,
      icon: `success`,
      text: `${text}`,
      html: `${ht}`,

      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }

    }).then(r => {
      return r.value

    })
  },

  successAlert2 (text, actionType = '', html) {
    let ht = html ? html : ''
    return swal.fire({
      title: `${actionType}`,
      icon: `success`,
      text: `${text}`,
      html: `${ht}`,
      showCancelButton: false,
      allowOutsideClick: false,
    }).then(r => {
      return r.value

    })
  },

  errorAlert (message, actionType) {
    // eslint-disable-next-line no-undef
    errorAlert.fire({
      title: `${actionType.toUpperCase()} FAILED`,
      html: message,
      showConfirmButton: true,
      scrollbarPadding: false
    })
  },


  //error with response data service
  errorWithResponseDataService(message = '',html,actionType = '', icon){
    let iconParam = icon ? icon : `error`;
    Swal.fire({
      title : `${actionType}`,
      icon : `${iconParam}`,
      text : `${message}`,
      html : `${html}`,
      customClass:{
        confirmButton: 'btn btn-primary font-weight-bolder',
        cancelButton: 'btn btn-secondary font-weight-bolder',
        container : 'swal-container'
      },
      showCancelButton : false,
      allowOutsideClick : false
    }).then(r =>{
      return r.value;
    });
  },

  warningActionService(text, actionType = ''){
    Swal.fire({
      title: `${actionType}`,
      icon: `warning`,
      text: `${text}`,
      showCancelButton : false,
      allowOutsideClick : false,
      customClass : {
        confirmButton: 'btn btn-warning font-weight-bolder',
        container : 'swal-container'
      }
    }).then(r =>{
      return r.value;

    });
  },


}
