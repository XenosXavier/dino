import GameObject from "../game-object/game-object";
import Collider from "./collider";
import Component from "./component";

export interface CollisionSource {
  getBounds(gameObject: GameObject): Collider;
  getHitboxes(gameObject: GameObject): Collider[];
}

export default class CollisionBody implements Component {
  private gameObject: GameObject;
  private source: CollisionSource;

  public constructor(gameObject: GameObject, source: CollisionSource) {
    this.gameObject = gameObject;
    this.source = source;
  }

  public getBounds(): Collider {
    return this.source.getBounds(this.gameObject);
  }

  public getHitboxes(): Collider[] {
    return this.source.getHitboxes(this.gameObject);
  }
}
