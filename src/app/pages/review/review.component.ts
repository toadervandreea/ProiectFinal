import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewMessage: string = '';
  reviews: any[]=[];

  updatedMessage: string = '';
 

  constructor(private reviewService: ReviewService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  
  loadReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      (data) => {
        console.log('Datele primite:', data);
        this.reviews = data;
      },
      (error) => {
        console.error('Eroare la obținerea review-urilor', error);
      }
    );
  }

  submitReview(): void {
    if (this.reviewMessage.trim() !== '') {
      const reviewData = { message: this.reviewMessage.trim() };

      this.reviewService.submitReview(reviewData).subscribe(
        (response) => {
          console.log('Review trimis cu succes!', response);

          if (response.message) {
            console.log(response.message); 
          } else {
            console.error('Mesajul din răspunsul serverului lipsește!');
          }

          this.loadReviews(); 
          this.reviewMessage = '';
        },
        (error) => {
          console.error('Eroare la trimiterea review-ului', error);
          console.error('Detalii eroare:', error.error);
        }
      );
    } else {
      console.log('Review-ul este gol. Te rugăm să scrii ceva înainte de a trimite.');
    }
  }
  

// Actualizează un review

updateReview(reviewId: number): void {
  console.log('Valoarea primită pentru reviewId:', reviewId);

  // Verifică dacă reviewId este un număr valid
  if (isNaN(reviewId) || reviewId === null || reviewId === undefined) {
    console.error('ID-ul review-ului nu este valid.');
    return;
  }

  const updatedMessage = prompt('Introdu noul mesaj pentru review:');
  console.log('Valoarea introdusă pentru updatedMessage:', updatedMessage);

  if (updatedMessage !== null) {
    this.reviewService.updateReviewById(reviewId, updatedMessage).subscribe(
      (response) => {
        console.log('Review actualizat cu succes!', response);
       
        this.reviews = this.reviews.map(review => 
          review.id === reviewId ? { ...review, message: updatedMessage } : review
        );
      },
      (error) => {
        console.error('Eroare la actualizarea review-ului', error);
        console.error('Detalii eroare:', error.error);
      }
    );
  }
}

// Șterge un review
deleteReview(reviewId: number): void {
  if (confirm('Ești sigur că vrei să ștergi acest review?')) {
    this.reviewService.deleteReviewById(reviewId).subscribe(
      (response) => {
        console.log('Review șters cu succes!', response);
        this.reviews = this.reviews.filter(review => review.id !== reviewId);
      },
      (error) => {
        console.error('Eroare la ștergerea review-ului', error);
        console.error('Detalii eroare:', error.error);
      }
    );
  }
}

}


