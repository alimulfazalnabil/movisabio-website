/**
 * MOVISABIO ENTERPRISE GEOSPATIAL CONFIGURATION
 * CARTO Basemaps + API Configuration
 * 
 * Account ID: 238993
 * Testing API Key: cb1_54ep_1_72ddc18234e075fcc4aee97a
 * Basemaps: Dark Matter (Default), Voyager, Positron
 */

(function () {
    'use strict';

    const MOVISABIO_MAP_CONFIG = {
        cartoAccountId: "238993",
        cartoApiKey: "cb1_54ep_1_72ddc18234e075fcc4aee97a",

        defaultBasemap: "dark",

        basemaps: {
            dark: {
                id: "dark",
                name: "CARTO Dark Matter",
                url: "https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
                subdomains: "abcd",
                maxZoom: 20,
                description: "Default enterprise operations map"
            },

            voyager: {
                id: "voyager",
                name: "CARTO Voyager",
                url: "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
                subdomains: "abcd",
                maxZoom: 20,
                description: "Detailed geographic and urban visualization"
            },

            positron: {
                id: "positron",
                name: "CARTO Positron",
                url: "https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
                subdomains: "abcd",
                maxZoom: 20,
                description: "Clean light geographical visualization"
            }
        },

        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>',

        /**
         * Construct the complete CARTO tile URL with API key query parameter.
         * Ensures exactly one query separator '?' is present.
         * 
         * @param {string} basemapKey 'dark' | 'voyager' | 'positron'
         * @returns {string} Fully qualified tile URL with key
         */
        getTileUrl: function (basemapKey) {
            const key = basemapKey && this.basemaps[basemapKey] ? basemapKey : this.defaultBasemap;
            const basemap = this.basemaps[key];
            const baseUrl = basemap.url;
            if (!this.cartoApiKey) return baseUrl;

            const separator = baseUrl.includes('?') ? '&' : '?';
            return `${baseUrl}${separator}key=${encodeURIComponent(this.cartoApiKey)}`;
        }
    };

    // Global Window & Module Export
    if (typeof window !== 'undefined') {
        window.MOVISABIO_MAP_CONFIG = MOVISABIO_MAP_CONFIG;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = MOVISABIO_MAP_CONFIG;
    }
})();
