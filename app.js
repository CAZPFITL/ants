import AntsApp from './src/AntsApp.js';

/**
 * App initialization.
 * Name: Ants
 * Creator: CAZPFITL
 * License: MIT
 * Description: this application let you play with ants and neural networks, letting our little friend, learn how to find things
 * TODO: ANTS REPRODUCTION PENDING (QUEEN ANT)
 * 
 *
 *
 * 
 * GENERAL POINTS:
 * -points of food source like trees, garbasge bins, kitchens, etc.
 * -world maps (type of world maps)
 * -generate randomly the world map type asked
 * -once the entire world has been scanned, the ants will go to the food source iin lines , 
 * -the soilders will follow this path searching for bigger traces of food
 * -if a worker find a big traceof food, he will search for near ant for help, then the ants will take pieces of that big trace of food until its over
 * - if a soilder founds a trace of food that is beeing melted by workers he will as them to leave if he can take the entire piece
 *      This points have some take aways:
 *          -source foods 
 *          -size of traces
 *          -random 100%
 * 
 *  =THERE ARE TWO TYPES OF TASK PRIMARY AND SECONDARY=
 * 
 *  ->PRIMARY: WILL CONTINUE UNTIL IT'S DONE NO MATTER WHAT
 *  ->SECONDARY: WILL START NO MATTER WHAT AND AT THIS POINT IT WILL BE A PRIMARY TASK
 *  ->>LEVEL OF IMPORTANCE = DEPENDING OF AGE THE ANT WILL HAVE DIFFERENT LEVELS ON IMPORTANCE ON EVERY PRIMARY TASKS
 * 
 *  DONE: -first task : explore entire map 
 *  DONE: -second task: if a trace of food is finded the ants will mark in in the ant hill, 
 *  IN PROGRESS: -third task: then the workers will start to take food from there
 *  TODO: -fifth task: the primary task will be executed in the order of importance
 *  TODO: -sixth task: if the ant gets 100 days of life NOTE: the ant will thange the level of importance
 *  TODO: -seventh task: once the ant gets 150 days of life it goes to the graveyard to die and it gets filtered from anthill 
 * 
 *  --AT THIS POINT IF THE MAP HASN'T BEEN SCANNED THE FIRST TASK WILL CONTINUE--
 *  posible music: 
 *      -Lucy in Disguise - The Trigger
 *      -LukeArcher - Breathing Space
 * 
 * NOTES_https://codepen.io/habelle/details/zXKBga
 */
AntsApp.init('v0.5.8');