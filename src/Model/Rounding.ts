/*
 * Copyright (C) 2017 Atlas Project LLC
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 *
 * Proprietary and confidential.
 */

/**
 * Rounding methods.
 */
export enum Rounding {
  /**
   * Round to nearest.
   */
  Nearest = "nearest",

  /**
   * Round to value further from zero.
   */
  Up = "up",

  /**
   * Round to value closest to zero.
   */
  Down = "down",

  /**
   * Round to previous value on number line.
   */
  Floor = "floor",

  /**
   * Round to next value on number line
   */
  Ceil = "ceil"
}
