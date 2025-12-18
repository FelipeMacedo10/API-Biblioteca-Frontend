import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesLivro } from './detalhes-livro';

describe('DetalhesLivro', () => {
  let component: DetalhesLivro;
  let fixture: ComponentFixture<DetalhesLivro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesLivro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesLivro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
