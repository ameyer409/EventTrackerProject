export class Game {
  id: number;
  name: string;
  genre: string;
  rating: string;
  score: number;
  hallOfFame: boolean;
  releaseDate: Date;
  completedDate: Date;
  description: string;
  review: string;


  constructor(
    id: number = 0,
    name: string = '',
    genre: string = '',
    rating: string = '',
    score: number = 0,
    hallOfFame: boolean = false,
    releaseDate: Date = new Date(Date.now()),
    completedDate: Date = new Date(Date.now()),
    description: string = '',
    review: string = ''
  ){
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.rating = rating;
    this.score = score;
    this.hallOfFame = hallOfFame;
    this.releaseDate = releaseDate;
    this.completedDate = completedDate;
    this.description = description;
    this.review = review;
  }
}
