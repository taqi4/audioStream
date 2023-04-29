import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  notification: any = null;

  constructor() { }

  showToast(type: string, msg: string): void {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast:any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: <any>type,
      title: msg
    })
  }

  showDelConfirm(title = 'Are you sure', text = 'You won\'t be able to revert this!'): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F46177',
      confirmButtonText: 'Yes, delete it!'
    });
  }

  showConfirm(params: any = {}): Promise<any> {
    return Swal.fire({
      title: params?.title || 'Are you sure',
      text: params?.text || 'You won\'t be able to revert this!',
      icon: params?.icon,
      html:params.html,
      showCancelButton: true,
      confirmButtonColor: params?.confirmButtonColor || '#F46177',
      confirmButtonText: params?.confirmButtonText || 'Yes, delete it!'
    });
  }

  

}
