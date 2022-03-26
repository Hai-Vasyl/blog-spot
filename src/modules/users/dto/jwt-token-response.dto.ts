export class JwtTokenResponseDTO {
  public accessToken: string;

  public constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
