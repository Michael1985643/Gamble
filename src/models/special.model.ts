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
        public linked: string,
        public linkedId: string,
        public linkedWedstrijdId: string,
        public pot: number,
        public type: string = "special"
	){	}
}