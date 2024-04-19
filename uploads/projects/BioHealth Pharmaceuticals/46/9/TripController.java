package com.tp4815.api.controller;

import com.tp4815.api.model.Trip;
import com.tp4815.api.model.User;
import com.tp4815.api.repository.TripRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class TripController {

    @Autowired
    private TripRepo tripRepo;

    @GetMapping(value = "/trips")
    public String getPage() {
        return "API OPTIONS<br/>"+
                "<br/>GET /api/v1/trips"+
                "<br/>POST /api/v1/trips"+
                "<br/>GET /api/v1/trips/{tripId}"+
                "<br/>PUT /api/v1/trips/{tripId}"+
                "<br/>DELETE /api/v1/trips/{tripId}"+
                "<br/>POST /api/v1/saveTrip"+
                "<br/>PUT /api/v1/updateTrip/{id}";
    }

    @GetMapping(value = "/api/v1/trips")
    public List<Trip> getTripsGet(){
        return tripRepo.findAll();
    }

    @PostMapping(value = "/api/v1/trips")
    public List<Trip> getTripsPost(){
        return tripRepo.findAll();
    }

    @GetMapping(value = "/api/v1/trips/{id}")
    public Trip getTripGet(@PathVariable long id){
        return tripRepo.findById(id).get();
    }

    @PutMapping(value = "/api/v1/trips/{id}")
    public Trip getTripPut(@PathVariable long id){
        return tripRepo.findById(id).get();
    }

    @PostMapping(value = "/api/v1/saveTrip")
    public String saveTrip( @RequestBody Trip trip){
        tripRepo.save( trip);
        return "Saved Trip";
    }

    @PutMapping(value = "/api/v1/updateTrip/{tripID}")
    public String updateTrip( @PathVariable long tripID, @RequestBody Trip trip){
        Trip updatedTrip = tripRepo.findById(tripID).get();

        updatedTrip.setTripID(trip.getTripID());
        updatedTrip.setFromCity(trip.getFromCity());
        updatedTrip.setToCity(trip.getToCity());
        updatedTrip.setFromDate(trip.getFromDate());
        updatedTrip.setToDate(trip.getToDate());

        return "Trip "+tripID+" Updated";
    }

    @DeleteMapping( value = "/api/v1/deleteTrip/{id}")
    public String deleteTrip(@PathVariable long tripID){
        Trip deleteTrip = tripRepo.findById(tripID).get();
        tripRepo.delete(deleteTrip);
        return "Deleted trip " + tripID +"";
    }
}