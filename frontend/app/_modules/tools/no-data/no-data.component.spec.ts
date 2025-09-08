import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDataComponent } from './no-data.component';

describe('NoDataComponent', () => {

    let component: NoDataComponent;
    let fixture: ComponentFixture<NoDataComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
                imports: [NoDataComponent],
            })
            .compileComponents();
        fixture = TestBed.createComponent(NoDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('is created', () => {
        expect(component).toBeTruthy();
    });
});
