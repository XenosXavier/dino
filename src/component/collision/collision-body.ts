import { Component } from "@component/core";
import { Sprite } from "@game-object/core";
import { Config } from "@resource";

import Collider from "./collider";

export default class CollisionBody extends Component {
  constructor(sprite: Sprite) {
    super(sprite);
  }

  public getBounds(): Collider {
    const image = (this.gameObject as Sprite).texture.image;
    return new Collider(this.gameObject, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  public getHitboxes(): Collider[] {
    const texture = (this.gameObject as Sprite).texture;
    const hitboxes = Config.getTextureHitboxes(texture.key);
    return hitboxes.map((hitbox) => {
      return new Collider(this.gameObject, hitbox);
    });
  }
}
