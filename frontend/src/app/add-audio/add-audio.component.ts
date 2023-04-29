import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ContextService } from '../context.service';
import { Router } from '@angular/router';
import { PopupService } from '../popup.service';
@Component({
  selector: 'app-add-audio',
  templateUrl: './add-audio.component.html',
  styleUrls: ['./add-audio.component.scss']
})
export class AddAudioComponent {
  audioForm:any = FormGroup;
  environment = environment;
  submitted = false;
  imageFile:any;
  audioFile:any;
  get f() { return this.audioForm.controls; }

  constructor( private formBuilder: FormBuilder,private httpService :HttpClient,private context : ContextService,private router: Router,private popupService :PopupService){

  }
  ngOnInit() {
    //Add User form validations
    this.audioForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      audio: ['', [Validators.required]],
    });
  }
  onSubmit() {
    
    this.submitted = true;
    // stop here if form is invalid
    if (this.audioForm.invalid) {
        return;
    }
    const formaData = new FormData();
    formaData.append('name',this.audioForm.value.name);
    formaData.append('description',this.audioForm.value.description);
    formaData.append('image',this.imageFile);
    formaData.append('audio',this.audioFile);

    this.httpService.post(this.environment.baseUrl+"v1/audio/upload",formaData).subscribe((res:any)=>{
      if(res && res.id){
        this.popupService.showToast('success',"Audio uploaded successfully");
        this.imageFile = null;
        this.audioFile = null;
        this.audioForm.reset();
        this.submitted = false;
      }
    },err=>{
      this.popupService.showToast('error',err.error.message)

    })
    //True if all the fields are filled
    
   
  }
  getImageFileDetails (e:any) {
    // this.FileSize = e.target.files[0].size/(1024*1024);
    // this.file_name=e.target.files[0].name
     this.imageFile = e.target.files[0];
   
  }
  getAudioFileDetails (e:any) {
    // this.FileSize = e.target.files[0].size/(1024*1024);
    // this.file_name=e.target.files[0].name
     this.audioFile = e.target.files[0];
   
  }
}
