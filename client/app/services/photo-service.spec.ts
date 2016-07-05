import {
  it,
  inject,
  beforeEach,
  beforeEachProviders
} from 'angular2/testing';

import {provide} from 'angular2/core';
import {Http, BaseRequestOptions, Response, ResponseOptions} from 'angular2/http'
import {MockBackend, MockConnection} from 'angular2/http/testing'

import {PhotoService} from './photo-service';

describe('PhotoService', () => {
  let mockBackend: MockBackend;
  let service: PhotoService;

  beforeEachProviders(() => [
    PhotoService,
    MockBackend,
    BaseRequestOptions,
    provide(Http, {
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions]
    })
  ]);

  beforeEach(inject([MockBackend, PhotoService], (_mockBackend, _service) => {
    mockBackend = _mockBackend;
    service = _service;
  }));

  it('getPhoto() should return Photo with ID=1', done => {
    let mockPhoto = {id: 1};
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let responseOpts = new ResponseOptions({body: JSON.stringify(mockPhoto)});
      connection.mockRespond(new Response(responseOpts));
    });

    service.getPhoto(1).subscribe(p => {
      expect(p.id).toBe(1);
      done();
    });
  });

  it('getPhotos() should return array of Photo objects', done => {
    let mockPhotos = [{id: 1}, {id:2}];
    mockBackend.connections.subscribe((connection: MockConnection) => {
      let responseOpts = new ResponseOptions({body: JSON.stringify(mockPhotos)});
      connection.mockRespond(new Response(responseOpts));
    });

    service.getPhotos().subscribe(p => {
      expect(p[0].id).toBe(1);
      expect(p[1].id).toBe(2);
      done();
    });
  });
});