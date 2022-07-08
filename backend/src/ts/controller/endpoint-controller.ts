import express from "express";
import Endpoint from "../constants/endpoint";

export default class EndpointController {
  endpoints: Endpoint[];
  constructor(app: express.Application) {
    this.endpoints = [];
  }
}
