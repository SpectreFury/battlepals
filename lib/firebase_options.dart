// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        return windows;
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDWFWwtih-5dY6TpfxAp6KJmztgqmZtFj8',
    appId: '1:839451011418:web:e52452ff244bd2830cab63',
    messagingSenderId: '839451011418',
    projectId: 'battlepals-33ed1',
    authDomain: 'battlepals-33ed1.firebaseapp.com',
    storageBucket: 'battlepals-33ed1.firebasestorage.app',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyDFfbSRsEImdHOX-643_p92DwS-tSQFDlY',
    appId: '1:839451011418:android:f61d2bd3198a0c160cab63',
    messagingSenderId: '839451011418',
    projectId: 'battlepals-33ed1',
    storageBucket: 'battlepals-33ed1.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAkbMRpProbGonTWQB7a3LgWUmIM_nUje8',
    appId: '1:839451011418:ios:fcff345766093f7a0cab63',
    messagingSenderId: '839451011418',
    projectId: 'battlepals-33ed1',
    storageBucket: 'battlepals-33ed1.firebasestorage.app',
    iosClientId:
        '839451011418-l07dev505nje32aof5fcn7amm0k734q2.apps.googleusercontent.com',
    iosBundleId: 'com.example.battlepals',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyAkbMRpProbGonTWQB7a3LgWUmIM_nUje8',
    appId: '1:839451011418:ios:fcff345766093f7a0cab63',
    messagingSenderId: '839451011418',
    projectId: 'battlepals-33ed1',
    storageBucket: 'battlepals-33ed1.firebasestorage.app',
    iosClientId:
        '839451011418-l07dev505nje32aof5fcn7amm0k734q2.apps.googleusercontent.com',
    iosBundleId: 'com.example.battlepals',
  );

  static const FirebaseOptions windows = FirebaseOptions(
    apiKey: 'AIzaSyDWFWwtih-5dY6TpfxAp6KJmztgqmZtFj8',
    appId: '1:839451011418:web:e1aa9bf14236e70e0cab63',
    messagingSenderId: '839451011418',
    projectId: 'battlepals-33ed1',
    authDomain: 'battlepals-33ed1.firebaseapp.com',
    storageBucket: 'battlepals-33ed1.firebasestorage.app',
  );
}
