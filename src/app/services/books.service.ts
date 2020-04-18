import { Injectable } from '@angular/core';
import { Book } from '../../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
@Injectable({
  providedIn: 'root'
})
export class BooksService {

books : Book[] = []; 
booksSubject  = new Subject<Book[]>()

constructor() { this.getBooks(); }

emitBooks(){this.booksSubject.next(this.books.slice())}

saveBook(){
     firebase.database().ref('/books').set(this.books); 
     }
     

updateBook(id:number , book :Book) {
   book.download +=1 ; 
    var updates = {};
    updates['/books/' + id] = book;
   return firebase.database().ref().update(updates);
  }


 
getBooks(){
       firebase.database().ref('/books')
       .on('value',(data:DataSnapshot)=>{
           this.books= data.val()? data.val():[]
           this.emitBooks()
       });
     }

getSingleBook(id:number){
       return new Promise((resolve,reject)=>{
         firebase.database().ref('/books/' + id ).once('value').then(
           (data:DataSnapshot)=>{
             resolve(data.val()); 
           },
          (error)=>{
            reject(error); 
          }
         );
       }
      );
     }

createBook(book:Book){
       this.books.push(book); 
       this.saveBook();
       this.emitBooks();}

removeBook(book:Book){
  if(book.photo) {
    
    const storageRef = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo removed!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
       const bookIndexToRemove = this.books.findIndex(
         (bookEl)=>{
           if(book===bookEl) return true; 
         }
       ); 

       this.books.splice(bookIndexToRemove,1); 
       this.saveBook();
       this.emitBooks();
     }
/// Upload File 
uploadImage(file:File){
  return new Promise((resolve,reject)=>{
    const almostUniqueFileName = Date.now().toString(); 
    const upload = firebase.storage().ref()
     .child('images/books/' + almostUniqueFileName + file.name).put(file); 
    upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        console.log('Chargement Image...') ; 
      }, 
      (error)=>{
        console.log('Erreur de Chargement Image !'+error);
        reject(); 
        
      },
      ()=> {
        resolve(upload.snapshot.ref.getDownloadURL()); 
      }
      );

  });
}

uploadDocument(file:File){
  return new Promise((resolve,reject)=>{
    const almostUniqueFileName = Date.now().toString(); 
    const upload = firebase.storage().ref()
     .child('documents/' + almostUniqueFileName + file.name).put(file); 
    upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        console.log('Chargement Document ...') ; 
      }, 
      (error)=>{
        console.log('Erreur de Chargement Document !'+error);
        reject(); 
        
      },
      ()=> {
        resolve(upload.snapshot.ref.getDownloadURL()); 
      }
      );

  });
}



}
