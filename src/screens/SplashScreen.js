import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StatusBar,
  Animated, Dimensions, StyleSheet, Image, SafeAreaView, ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const NAVY    = '#1a2f6e';
const RED     = '#d42b2b';
const PHOTO_H = width * 0.67;   // khớp tỉ lệ ảnh landscape campus (3:2)
const BADGE_D = 130;
const BADGE_R = BADGE_D / 2;

/* ── Wave arc decorations (bottom-left + bottom-right clusters) ── */
function WaveArcs() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* bottom-right */}
      {Array.from({ length: 14 }, (_, i) => (
        <View key={`r${i}`} style={{
          position: 'absolute',
          right:  -(40 + i * 46),
          bottom: -(40 + i * 46),
          width:   160 + i * 92,
          height:  160 + i * 92,
          borderRadius: (160 + i * 92) / 2,
          borderWidth: 1.2,
          borderColor: `rgba(14,165,233,${Math.max(0.02, 0.17 - i * 0.011)})`,
        }} />
      ))}
      {/* bottom-left */}
      {Array.from({ length: 10 }, (_, i) => (
        <View key={`l${i}`} style={{
          position: 'absolute',
          left:   -(60 + i * 42),
          bottom: height * 0.06 - i * 22,
          width:   200 + i * 84,
          height:  200 + i * 84,
          borderRadius: (200 + i * 84) / 2,
          borderWidth: 1,
          borderColor: `rgba(56,189,248,${Math.max(0.02, 0.12 - i * 0.011)})`,
        }} />
      ))}
    </View>
  );
}

/* ── TDTU Logo Badge ── */
function LogoBadge() {
  return (
    <View style={s.badge}>
      {/*
        Để dùng ảnh logo thật, thay View này bằng:
        <Image source={require('../../assets/tdtu-logo.png')}
               style={{ width: BADGE_D - 24, height: BADGE_D - 24 }}
               resizeMode="contain" />
      */}
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: '900', color: RED, lineHeight: 34 }}>T</Text>
          <View style={{ alignItems: 'center', marginHorizontal: 1 }}>
            <Text style={{ fontSize: 19, fontWeight: '900', color: NAVY, lineHeight: 20 }}>Đ</Text>
            <View style={{ width: 16, height: 3, backgroundColor: NAVY, borderRadius: 2 }} />
          </View>
          <Text style={{ fontSize: 32, fontWeight: '900', color: '#1d4ed8', lineHeight: 34 }}>T</Text>
        </View>
        <Text style={{ fontSize: 7, fontWeight: '800', color: '#555', letterSpacing: 0.5, marginTop: 5, textAlign: 'center' }}>
          ĐẠI HỌC TÔN ĐỨC THẮNG
        </Text>
        <Text style={{ fontSize: 6.5, fontWeight: '600', color: '#777', letterSpacing: 0.4, textAlign: 'center' }}>
          TON DUC THANG UNIVERSITY
        </Text>
      </View>
    </View>
  );
}

/* ── Main SplashScreen ── */
export default function SplashScreen({ navigation }) {
  const aFade  = useRef(new Animated.Value(0)).current;
  const aSlide = useRef(new Animated.Value(32)).current;
  const aScale = useRef(new Animated.Value(1)).current;

  // Căn giữa logo trong khoảng trống giữa tên đề tài và GVHD/Tác giả
  const INFO_H    = 190;
  const spaceTop  = height * 0.45;
  const spaceBot  = height * 0.8 - INFO_H;
  const LOGO_SIZE = height * 0.32;
  const LOGO_TOP  = (spaceTop + spaceBot - LOGO_SIZE) / 2 - 30;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(aFade,  { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(aSlide, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(aScale, { toValue: 0.975, duration: 900, useNativeDriver: true }),
        Animated.timing(aScale, { toValue: 1.000, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#7aafc8" />

      {/* ── CAMPUS PHOTO AREA ── */}
      <View style={[s.photo, { height: PHOTO_H }]}>
        <ImageBackground
          source={require('../../assets/campus.jpg')}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
        >
          {/* Lớp xanh phủ lên giữ tone gradient đặc trưng */}
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(91,154,184,0.40)' }]} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(130,181,204,0.38)', top: '35%' }]} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(180,211,224,0.50)', top: '60%' }]} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(216,234,242,0.65)', top: '78%' }]} />
          <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(237,245,250,0.82)', top: '88%' }]} />
        </ImageBackground>

        {/* ── TÊN TRƯỜNG & KHOA căn giữa ngang với 2 logo ── */}
        <SafeAreaView style={s.schoolNameWrap}>
          <View style={{ paddingTop: 12, height: 72, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={s.schoolName}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</Text>
            <Text style={s.schoolName}>KHOA TOÁN - THỐNG KÊ</Text>
          </View>
        </SafeAreaView>

        {/* ── LOGO BADGE góc trên trái (TDTU) ── */}
        <SafeAreaView style={s.logoWrapLeft}>
          <View style={s.logoBadge}>
            <Image
              source={require('../../assets/tdtu-logo.png')}
              style={s.logoImg}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>

        {/* ── LOGO BADGE góc trên phải (Khoa Toán) ── */}
        <SafeAreaView style={s.logoWrapRight}>
          <View style={s.logoBadge}>
            <Image
              source={require('../../assets/math-logo.jpg')}
              style={s.logoImg}
              resizeMode="contain"
            />
          </View>
        </SafeAreaView>
      </View>

      {/* ── WHITE CONTENT CARD ── */}
      <View style={[s.card, { top: PHOTO_H - 30 }]}>
        <WaveArcs />

      </View>

      {/* ── LOGO APP ── */}
      <Animated.View style={[s.appLogoWrap, { top: LOGO_TOP, opacity: aFade }]}>
        <Image
          source={require('../../assets/app-logo.png')}
          style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
          resizeMode="contain"
        />
      </Animated.View>

      {/* ── THÔNG TIN GVHD & TÁC GIẢ ── */}
      <Animated.View style={[s.infoWrap, { opacity: aFade }]}>
        <Text style={s.infoLabel}>Giảng viên hướng dẫn</Text>
        <Text style={s.infoName}>PGS. TS. Trần Minh Phương</Text>
        <Text style={s.infoName}>TS. Nguyễn Hữu Cần</Text>

        <Text style={[s.infoLabel, { marginTop: 14 }]}>Tác giả</Text>
        <Text style={s.infoName}>Hồ Thị Ngọc Huyền</Text>
        <Text style={s.infoName}>Nguyễn Đức Hoàng</Text>
        <Text style={s.infoName}>Nguyễn Tuấn Quỳnh</Text>
      </Animated.View>

      {/* ── NÚT VÀO NGAY cuối màn hình ── */}
      <Animated.View style={[s.btnWrap, { opacity: aFade, transform: [{ scale: aScale }] }]}>
        <TouchableOpacity
          style={s.btn}
          onPress={() => navigation.replace('Home')}
          activeOpacity={0.82}
        >
          <Text style={s.btnTxt}>Vào Ngay</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ── TÊN ĐỀ TÀI căn giữa màn hình tuyệt đối ── */}
      <Animated.View style={[s.projectWrap, { opacity: aFade }]}>
        <Text style={s.projectTitle}>
          XÂY DỰNG MÔ HÌNH VÀ MÔ PHỎNG GIẢI SỐ CHO{'\n'}
          CÁC BÀI TOÁN GIÁ TRỊ BIÊN ỨNG DỤNG
        </Text>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#e8f4fb' },

  photo: {
    position: 'absolute', top: 0, left: 0, right: 0,
    overflow: 'hidden',
  },

  card: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: '#e8f4fb',
    borderTopLeftRadius: 32, borderTopRightRadius: 32,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
  },

  schoolNameWrap: {
    position: 'absolute', top: 0, left: 72 + 16, right: 72 + 16,
    alignItems: 'center',
  },

  schoolName: {
    fontSize: 12,
    fontWeight: '700',
    color: NAVY,
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  logoWrapLeft: {
    position: 'absolute', top: 0, left: 0,
    paddingTop: 12, paddingLeft: 16,
  },

  logoWrapRight: {
    position: 'absolute', top: 0, right: 0,
    paddingTop: 12, paddingRight: 16,
  },

  logoBadge: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#fff',
    overflow: 'hidden',
    opacity: 0.95,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 8,
  },

  logoImg: {
    width: 60, height: 60,
  },

  title: {
    fontSize: 34, fontWeight: '900', letterSpacing: 0.2,
    textAlign: 'center', marginBottom: 7,
  },

  subtitle: {
    fontSize: 11, letterSpacing: 2.6, color: '#9db8c8',
    fontWeight: '500', textAlign: 'center',
  },

  projectWrap: {
    position: 'absolute',
    left: 0, right: 0,
    top: height * 0.17,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    pointerEvents: 'none',
  },

  methodsText: {
    fontSize: 16,
    fontWeight: '800',
    fontStyle: 'italic',
    color: NAVY,
    letterSpacing: 2.5,
    marginTop: 10,
    textAlign: 'center',
  },

  projectTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#c02020',
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.3,
  },

  appLogoWrap: {
    position: 'absolute',
    left: 0, right: 0,
    alignItems: 'center',
  },

  appLogoTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  infoWrap: {
    position: 'absolute',
    left: 0, right: 0,
    bottom: height * 0.16,
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  infoLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: NAVY,
    textAlign: 'center',
    marginBottom: 4,
  },

  infoName: {
    fontSize: 15,
    fontWeight: '400',
    color: NAVY,
    textAlign: 'center',
    lineHeight: 24,
  },

  btnWrap: {
    position: 'absolute',
    left: 28, right: 28, bottom: 40,
    alignItems: 'center',
  },

  btn: {
    width: width - 56,
    backgroundColor: NAVY,
    borderRadius: 14,
    paddingVertical: 19,
    alignItems: 'center',
    shadowColor: NAVY, shadowOpacity: 0.35,
    shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 9,
  },
  btnTxt: {
    color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 1.2,
  },
});
