import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

class IncorrectResponse{
	constructor(public query:string, public response:string, public customer_id:string){}
}

class UnrecognizedQuery{
	constructor(public query:string, public customer_id:string){}
}

class TrackResponse {
	constructor(public id:number){}
}

@Injectable({
	providedIn: 'root'
})
export class TrackService {
	readonly customerID = environment.customerID;
	readonly baseUrl = environment.baseTrackingUrl;

	constructor(private http: HttpClient) { }

	//registers incorrect response
	public unrecognizedQuery = (query:string) =>
		this.http.post(`${this.baseUrl}/query/unrecognized`, new UnrecognizedQuery(query, this.customerID))
}
