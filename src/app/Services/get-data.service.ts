import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCollection } from '../Interfaces/DataCollection';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {}

  reposlist: DataCollection[] = [];

  GetData() {
    return this.http.get<DataCollection[]>('http://192.168.2.101:8001/Api/WifiTemperature/Get');
  }

  ConvertData(data: DataCollection[])
  {
      this.reposlist = data;

      return this.reposlist.slice(0, this.reposlist.length);
  }
}
