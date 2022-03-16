import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup , FormBuilder , Validators} from '@angular/forms'
import { Itask } from 'src/app/model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public todoForm!:FormGroup;
  tasks :Itask[] = [];
  inprogres:Itask[] = [];
  done:Itask[] = [];
  updateId!:any;
  isEditEnable:boolean = false;
  updatebuttonEnable:boolean = false;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item:['' , [Validators.required]],
    })
  }

  onSubmit(){
    console.log(this.todoForm.value);
    this.tasks.push({
      description: this.todoForm.value.item,
      done:false,
    });
    this.todoForm.reset();
  }

  deleteTask(i:number){
    this.tasks.splice(i,1);
  }

  deleteinprogres(i:number){
    this.inprogres.splice(i,1);
  }

  deleteDone(i:number){
    this.done.splice(i,1);
  }

  editTask(item:Itask , i:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnable = true;

  }

  onUpdate(){
   this.tasks[this.updateId].description = this.todoForm.value.item;
   this.tasks[this.updateId].done = false;
   this.todoForm.reset();
   this.isEditEnable = false;
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
}
}