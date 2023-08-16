import fs from "fs";

export default class Course {
	constructor(name, startDate, availablePlaces) {
		this.name = name;
		this.startDate = startDate;
		this.availablePlaces = availablePlaces;
	}

	isAvailable(requiredPlaces) {
	  const today = new Date();

		if (typeof this.startDate !== 'object' || typeof this.startDate.getTime !== 'function') {
			throw new Error('startDate must be a object');
		}

		if (typeof requiredPlaces !== 'number') {
			throw new Error('requiredPlaces must be a number');
		}

		if (typeof this.availablePlaces !== 'number') {
			throw new Error('availablePlaces must be a number');
		}

	  if (today.getTime() >= this.startDate.getTime()) {
	    return false;
	  }

	  return this.availablePlaces >= requiredPlaces;
	}

	bookCourse(requiredPlaces) {
		fs.writeFile('booked_course.txt', `${this.name} : ${requiredPlaces}`, (err) => {
			if (err) throw err;
		});
	}
}
