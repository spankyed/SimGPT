import { Scene } from "@babylonjs/core";

export type EntityId = string;
export type Tag = string;
export type Value = any;
export type Pair = [EntityId, Tag, EntityId];
export type Data = { [key: string]: any; };
export type EventHandler = (world: World, data: Data) => void;
export type TagMap = Map<Tag, Value>; // hierarchy parent/child: https://github.com/SanderMertens/ecs-faq#how-to-1

export interface System {
  name: string;
  requirements?: (Tag | Pair)[];
  entities: Set<EntityId>;
  create?: (world: World) => any;
  update?: (world: World, id: EntityId) => void;
  events?: { [eventName: string]: EventHandler };
}

export interface World {
  scene: Scene;
  entities: Map<EntityId, TagMap>;
  systems: Set<System>;
  eventQueue: WorldEvent[];
}

export interface WorldEvent {
  name: string;
  data: Data;
}
