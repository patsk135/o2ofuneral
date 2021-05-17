import { CeremonyDetail } from '../models/ceremony_detail.model';
import { Dependencies } from '../container';
import { ICeremonyDetailRepository } from './ceremonyDetail.repository';

export interface ICeremonyService {}

export default class CeremonyService implements ICeremonyService {
    private readonly ceremonyDetailRepository: ICeremonyDetailRepository;
    constructor({
        ceremonyDetailRepository
    }: Dependencies<ICeremonyDetailRepository>) {
        this.ceremonyDetailRepository = ceremonyDetailRepository;
    }
}
