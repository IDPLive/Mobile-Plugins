var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { AwesomeCordovaNativePlugin, cordova } from '@awesome-cordova-plugins/core';
export var OutputType;
(function (OutputType) {
    OutputType[OutputType["FILE_URL"] = 0] = "FILE_URL";
    OutputType[OutputType["DATA_URL"] = 1] = "DATA_URL";
})(OutputType || (OutputType = {}));
var ImagePickerOriginal = /** @class */ (function (_super) {
    __extends(ImagePickerOriginal, _super);
    function ImagePickerOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImagePickerOriginal.prototype.getPictures = function (options) { return cordova(this, "getPictures", { "callbackOrder": "reverse" }, arguments); };
    ImagePickerOriginal.prototype.hasReadPermission = function () { return cordova(this, "hasReadPermission", { "platforms": ["Android"] }, arguments); };
    ImagePickerOriginal.prototype.requestReadPermission = function () { return cordova(this, "requestReadPermission", { "platforms": ["Android"] }, arguments); };
    ImagePickerOriginal.pluginName = "ImagePicker";
    ImagePickerOriginal.plugin = "cordova-plugin-telerik-imagepicker";
    ImagePickerOriginal.pluginRef = "window.imagePicker";
    ImagePickerOriginal.repo = "https://github.com/kalaiprakash93/ImagePicker.git";
    ImagePickerOriginal.install = "ionic cordova plugin add cordova-plugin-telerik-imagepicker --variable PHOTO_LIBRARY_USAGE_DESCRIPTION=\"your usage message\"";
    ImagePickerOriginal.installVariables = ["PHOTO_LIBRARY_USAGE_DESCRIPTION"];
    ImagePickerOriginal.platforms = ["Android", "iOS"];
    return ImagePickerOriginal;
}(AwesomeCordovaNativePlugin));
var ImagePicker = new ImagePickerOriginal();
export { ImagePicker };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL3BsdWdpbnMvaW1hZ2UtcGlja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLHVDQUErQyxNQUFNLCtCQUErQixDQUFDO0FBb0Q1RixNQUFNLENBQU4sSUFBWSxVQUdYO0FBSEQsV0FBWSxVQUFVO0lBQ3BCLG1EQUFZLENBQUE7SUFDWixtREFBUSxDQUFBO0FBQ1YsQ0FBQyxFQUhXLFVBQVUsS0FBVixVQUFVLFFBR3JCOztJQXVDZ0MsK0JBQTBCOzs7O0lBV3pELGlDQUFXLGFBQUMsT0FBMkI7SUFZdkMsdUNBQWlCO0lBWWpCLDJDQUFxQjs7Ozs7Ozs7c0JBbEl2QjtFQStGaUMsMEJBQTBCO1NBQTlDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBBd2Vzb21lQ29yZG92YU5hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGF3ZXNvbWUtY29yZG92YS1wbHVnaW5zL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlUGlja2VyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBtYXggaW1hZ2VzIHRvIGJlIHNlbGVjdGVkLCBkZWZhdWx0cyB0byAxNS4gSWYgdGhpcyBpcyBzZXQgdG8gMSwgdXBvbiBzZWxlY3Rpb24gb2YgYSBzaW5nbGUgaW1hZ2UsIHRoZSBwbHVnaW4gd2lsbCByZXR1cm4gaXQuIChBbmRyb2lkIG9ubHkpXG4gICAqL1xuICBtYXhpbXVtSW1hZ2VzQ291bnQ/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIE1heCB3aWR0aCB0byBhbGxvdyBpbWFnZXMgdG8gYmVcbiAgICovXG4gIHdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBNYXggaGVpZ2h0IHRvIGFsbG93IGltYWdlcyB0byBiZVxuICAgKi9cbiAgaGVpZ2h0PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBRdWFsaXR5IG9mIGltYWdlcywgZGVmYXVsdHMgdG8gMTAwXG4gICAqL1xuICBxdWFsaXR5PzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBWaWRlb3MgYWxsb3dlZD9cbiAgICovXG4gIGFsbG93X3ZpZGVvPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogdGhlIGRlZmF1bHQgaXMgdGhlIG1lc3NhZ2Ugb2YgdGhlIG9sZCBwbHVnaW4gaW1wbFxuICAgKi9cbiAgdGl0bGU/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIHRoZSBvbGQgcGx1Z2luIGltcGwgZGlkbid0IGhhdmUgaXQsIHNvIHBhc3NpbmcgbnVsbCBieSBkZWZhdWx0XG4gICAqL1xuICBtZXNzYWdlPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDaG9vc2UgdGhlIGZvcm1hdCBvZiB0aGUgcmV0dXJuIHZhbHVlLlxuICAgKiBEZWZpbmVkIGluIEltYWdlUGlja2VyLk91dHB1dFR5cGUuIERlZmF1bHQgaXMgRklMRV9VUkkuXG4gICAqICAgICAgRklMRV9VUkkgOiAwLCAgIFJldHVybiBpbWFnZSBmaWxlIFVSSSxcbiAgICogICAgICBEQVRBX1VSTCA6IDEsICAgUmV0dXJuIGltYWdlIGFzIGJhc2U2NC1lbmNvZGVkIHN0cmluZ1xuICAgKi9cbiAgb3V0cHV0VHlwZT86IG51bWJlcjtcblxuICAvKipcbiAgICogRGlzYWJsZSB0aGUgaU9TIHBvcG92ZXIgYXMgc2VlbiBvbiBpUGFkXG4gICAqL1xuICBkaXNhYmxlX3BvcG92ZXI/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZW51bSBPdXRwdXRUeXBlIHtcbiAgRklMRV9VUkwgPSAwLFxuICBEQVRBX1VSTCxcbn1cblxuLyoqXG4gKiBAbmFtZSBJbWFnZSBQaWNrZXJcbiAqIEBkZXNjcmlwdGlvblxuICogQ29yZG92YSBQbHVnaW4gRm9yIE11bHRpcGxlIEltYWdlIFNlbGVjdGlvblxuICpcbiAqIFJlcXVpcmVzIENvcmRvdmEgcGx1Z2luOiBgY29yZG92YS1wbHVnaW4taW1hZ2UtcGlja2VyYC5cbiAqIEZvciBtb3JlIGluZm8sIHBsZWFzZSBzZWUgdGhlIGh0dHBzOi8vZ2l0aHViLmNvbS9UZWxlcmlrLVZlcmlmaWVkLVBsdWdpbnMvSW1hZ2VQaWNrZXJcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgSW1hZ2VQaWNrZXIgfSBmcm9tICdAYXdlc29tZS1jb3Jkb3ZhLXBsdWdpbnMvaW1hZ2UtcGlja2VyL25neCc7XG4gKlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgaW1hZ2VQaWNrZXI6IEltYWdlUGlja2VyKSB7IH1cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmltYWdlUGlja2VyLmdldFBpY3R1cmVzKG9wdGlvbnMpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAqICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gKiAgICAgICBjb25zb2xlLmxvZygnSW1hZ2UgVVJJOiAnICsgcmVzdWx0c1tpXSk7XG4gKiAgIH1cbiAqIH0sIChlcnIpID0+IHsgfSk7XG4gKlxuICogYGBgXG4gKiBAaW50ZXJmYWNlc1xuICogSW1hZ2VQaWNrZXJPcHRpb25zXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnSW1hZ2VQaWNrZXInLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi10ZWxlcmlrLWltYWdlcGlja2VyJyxcbiAgcGx1Z2luUmVmOiAnd2luZG93LmltYWdlUGlja2VyJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9UZWxlcmlrLVZlcmlmaWVkLVBsdWdpbnMvSW1hZ2VQaWNrZXInLFxuICBpbnN0YWxsOlxuICAgICdpb25pYyBjb3Jkb3ZhIHBsdWdpbiBhZGQgY29yZG92YS1wbHVnaW4tdGVsZXJpay1pbWFnZXBpY2tlciAtLXZhcmlhYmxlIFBIT1RPX0xJQlJBUllfVVNBR0VfREVTQ1JJUFRJT049XCJ5b3VyIHVzYWdlIG1lc3NhZ2VcIicsXG4gIGluc3RhbGxWYXJpYWJsZXM6IFsnUEhPVE9fTElCUkFSWV9VU0FHRV9ERVNDUklQVElPTiddLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW1hZ2VQaWNrZXIgZXh0ZW5kcyBBd2Vzb21lQ29yZG92YU5hdGl2ZVBsdWdpbiB7XG4gIC8qKlxuICAgKiBQaWNrIHBpY3R1cmVzIGZyb20gdGhlIGxpYnJhcnkuXG4gICAqXG4gICAqIEBwYXJhbSB7SW1hZ2VQaWNrZXJPcHRpb25zfSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59IFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdGhlIGltYWdlIGZpbGUgVVJJXG4gICAqIG90aGVyd2lzZSByZWplY3RzIHdpdGggYW4gZXJyb3IuXG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgY2FsbGJhY2tPcmRlcjogJ3JldmVyc2UnLFxuICB9KVxuICBnZXRQaWN0dXJlcyhvcHRpb25zOiBJbWFnZVBpY2tlck9wdGlvbnMpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB3ZSBoYXZlIHBlcm1pc3Npb24gdG8gcmVhZCBpbWFnZXNcbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCBhIGJvb2xlYW4gdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB3ZSBoYXZlIHBlcm1pc3Npb25cbiAgICovXG4gIEBDb3Jkb3ZhKHtcbiAgICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCddLFxuICB9KVxuICBoYXNSZWFkUGVybWlzc2lvbigpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogUmVxdWVzdCBwZXJtaXNzaW9uIHRvIHJlYWQgaW1hZ2VzXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YSh7XG4gICAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnXSxcbiAgfSlcbiAgcmVxdWVzdFJlYWRQZXJtaXNzaW9uKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=
