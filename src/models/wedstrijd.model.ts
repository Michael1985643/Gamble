export class Toto{
	constructor(
		public id: number,
        public date: number,
        public homeTeamName: string,
        public homeTeamNameCrestUrl: string,
        public homeTeamNameLink: string,
        public goalsHomeTeam: string,
        public awayTeamName: string,
        public awayTeamNameCrestUrl: string,
        public awayTeamNameLink: string,
        public goalsAwayTeam: string,
        public apiUrl: string,
        public matchday: number,
        public oddsawayWin: number,
        public oddsdraw: number,
        public oddshomeWin: number,
	){	}
}