import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotesService } from 'src/app/shared/notes.service';
import { Note } from 'src/app/shared/note.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;  //property named note.
  noteId: number;
  new: boolean;


  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // we want to find out if we are creating a new note or editing an existing one.
    this.route.params.subscribe((params: Params) => {
      this.note = new Note();  //to instantiate to avoid the undefined error.
      if(params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    })
  }

  onSubmit(form: NgForm) {
    if(this.new) {
        // Save the note
    this.notesService.add(form.value);

    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }
}
