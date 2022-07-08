import Endpoint from "@constants/endpoint";
import express from "express";

export default class EndpointController {
  endpoints: Endpoint[];
  constructor(app: express.Application) {
    this.endpoints = [];
  }
}
