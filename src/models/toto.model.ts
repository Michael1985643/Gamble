export class Toto{
	constructor(
		public id: number,
        public name: string,
        public startDate: number,
        public endDate: number,
        public closedForGamble: number,
        public linked: string,
        public linkedId: number,
        public pot: number,
        public type: string = "toto"
	){	}
}