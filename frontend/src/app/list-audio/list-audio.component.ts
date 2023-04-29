import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ContextService } from '../context.service';
import { Router } from '@angular/router';
import { PopupService } from '../popup.service';
@Component({
  selector: 'app-list-audio',
  templateUrl: './list-audio.component.html',
  styleUrls: ['./list-audio.component.scss']
})
export class ListAudioComponent {
  constructor( private formBuilder: FormBuilder,private httpService :HttpClient,private context : ContextService,private router: Router,private popupService :PopupService){

  }
  isLoading:boolean = false;
  audioList:any = [];
  pageNumber = 1;
  perPage = 5;
  totalRecords = 5;
  public environment = environment;
  editAudioItem:any;
  showSideBar:boolean =false;
  editAudioForm :any =  FormGroup;
  submitted = false;
  get f() {
    return this.editAudioForm.controls;
  }
  ngOnInit() {
    this.editAudioForm= this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
    });
    this.loadAudioList()
  }
  loadAudioList(){
    this.isLoading =true;

    this.httpService.get(`${environment.baseUrl}v1/audio/list?limit=${this.perPage}&page=${this.pageNumber-1}`).subscribe((res:any)=>{
      if(res){
        this.audioList = res.results;
        this.isLoading = false;
        this.totalRecords = res.totalResults
      }
    })
  }
  editFormSubmit(){
    this.submitted =true;
    if (this.editAudioForm.invalid) {
      return;
  }
    this.httpService.post(`${environment.baseUrl}v1/audio/${this.editAudioItem.id}`,this.editAudioForm.value).subscribe((res:any)=>{
      if(res){
        this.popupService.showToast('success',"Song updated");
      }
    })
  }
  editAudio(audio:any){
    this.editAudioItem = audio;
    this.editAudioForm.patchValue({
      name : audio.name,
      description : audio.description
    })
    this.showSideBar = true;
  }
  deleteAudio(id:any){
    this.popupService.showDelConfirm().then(result=>{
      if(result.isConfirmed){

        this.httpService.delete(`${environment.baseUrl}v1/audio/${id}`).subscribe(res=>{
          if(res){
            this.popupService.showToast('success',"Song Deleted Successfully")
            this.audioList.splice(this.audioList.findIndex((item:any)=>item.id==id),1);
          }
        })
      }
    })
  }
  closeForm(){
    this.showSideBar = false;
    this.editAudioForm.reset();
  }
}
