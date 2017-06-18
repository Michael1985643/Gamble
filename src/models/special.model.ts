export class Special{
	constructor(
		public id: number,
        public name: string,
		public home: string,
		public away: string,
        public date: number,
        public homeImage: string,
        public awayImage: string,
        public closedForGamble: number,
        public linked: number,
        public linkedId: number,
        public linkedWedstrijdId: number,
        public pot: number
	){	}
}