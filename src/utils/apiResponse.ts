/**
 * Class representing an API Resonse.
 */
export default class APIResponse {
  private readonly data!: Object;
  private readonly message!: string;
  // private readonly status: number;
  // private readonly error: Object;
  private readonly success: boolean;

  constructor(
    data: Object = {},
    message: string = "",
    // status: number = 200,
    // error: Object = null,
    success: boolean = false
  ) {

    if (data) {
      this.data = data;
    }
    this.success = success;
    if (message) {
      this.message = message;
    }

    // if (status) {
    //   this.status = status;
    // }

    // if (error) {
    //   this.error = error;
    // }
  }
}




